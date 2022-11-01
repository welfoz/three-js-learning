import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import GUI from 'lil-gui';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

const gui = new GUI();

const parameters = {
    func: () => {
        parameters.color = "white"
        material.color.set(parameters.color)
    }
}
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 5)
const material = new THREE.MeshBasicMaterial({ color: "white", wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
const mesh_1 = new THREE.Mesh(geometry, material)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Group
 */
const group = new THREE.Group();
scene.add(group)
group.add(mesh)
// group.add(mesh_1)
/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("7877EE_D87FC5_75D9C7_1C78C0-256px.png")

const fontLoader = new FontLoader()

fontLoader.load(
    '/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.7,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 1
            }
        )
        textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.min.x + textGeometry.boundingBox.max.x) * 0.5,
        //     - (textGeometry.boundingBox.min.y + textGeometry.boundingBox.max.y) * 0.5,
        //     - (textGeometry.boundingBox.min.z + textGeometry.boundingBox.max.z) * 0.5,
        // )
        textGeometry.center()
        console.log(textGeometry.boundingBox)
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture}) 
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
    }
)

// create 100 donuts
// with same material & geometry
const donutGeom = new THREE.TorusGeometry(0.3, 0.1, 20, 20, 2 * Math.PI)
const donutMaterial = new THREE.MeshMatcapMaterial()
donutMaterial.matcap = matcapTexture

let donuts = []
for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeom, donutMaterial)
    donut.needs
    donut.geometry.attributes
    donut.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
        )
        donut.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            0
            )
            scene.add(donut)
            donuts.push(donut)
}
gui.add(donutGeom.parameters, "radius").onChange((value) => {
    donuts.forEach((donut) => {
    })
})

/**
 * axesHelper
 */
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
function animate() {
    requestAnimationFrame( animate );
    // camera.lookAt(new THREE.Vector3(x, y, 0))
    // x += 0.01 
    // console.log(clock.getElapsedTime())
    // // y += 0.01 
    // // group.position.x += 0.01
    // mesh.position.x += 0.01
    // mesh.rotateX(0.01);
    // mesh.rotateY(0.01);
    // camera.position.x = cursor.x * 4 
    // camera.position.y = cursor.y * 4
    // 2 * Math.PI = 1 tour
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)
    

    controls.update()
    renderer.render(scene, camera)
}
animate()

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // camera update
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // renderer update
    renderer.setSize(sizes.width, sizes.height)

    // if user have multiple screens with different pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})


window.addEventListener('dblclick', () =>
{
    // handle it for all browsers, including safari (apple) w/ webkit
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

gui.add(mesh.position, "y", -2, 2, 0.001)
gui.add(mesh, "visible")
gui.add(material, "wireframe")
gui.addColor(material, "color")
gui.add(parameters, "func")