var scene = null,
    camera = null,
    renderer = null,
    control = null;


const size = 10;
const divisions = 10;




function StarScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xB8E3A4);
    camera = new THREE.PerspectiveCamera(75 // ángulo de vision 
        , window.innerWidth / window.innerHeight, // relación aspecto 16:
        0.1, // Más cerca (no renderiza)
        1000); // Más lejos (no renderiza)


    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('models') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //ORBITCONTROLS
    control = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 0);
    control.update();

    //OBJETOS

    camera.position.z = 5;
    // grid helper
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // axes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    animate();

    crearluz("ambientel");

    crearluz("spotl");

    /* loadModel_objMtl("../models/obj_mtl/escenario/","throne.obj", "throne.mtl");

    loadModel_objMtl("../models/obj_mtl/personaje/","knt.obj","knt.mtl"); */


    loaderGLTF("../models/gltf/", "Duck.gltf");
}

function crearluz(tipoluz) {

    switch (tipoluz) {

        case "pointl":

            const pointLight = new THREE.PointLight(0xfEAE9C0, 1, 100);
            pointLight.position.set(0, 5, 0);
            scene.add(pointLight);

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
            scene.add(pointLightHelper);

            break;

        case "spotl":
            light = new THREE.SpotLight(0xffffff);
            light.position.set(20, 20, 20);
            light.rotation.y = 50;
            scene.add(light);

            const spotLightHelper = new THREE.SpotLightHelper(light);
            scene.add(spotLightHelper);
            break;

        case "ambientel":
            light = new THREE.AmbientLight(0x404040); // soft white light
            scene.add(light);
            break;

    }

}

function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}


/* 
function loadModel_objMtl(path, nameOBJ, nameMTL) {
    // Load MTL
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMTL, function (materials) {
        materials.preload();

        // Load OBJ
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(materials);
        objLoader.load(nameOBJ, function (object) {
            scene.add(object);
            // object.scale.set(5,5,5);
        });
    }); 

   
}  */

function loaderGLTF(path, nameGLTF) {

    alert(path);
    var gltfLoader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();

    dracoLoader.setDecoderPath("../models/gltf/");

    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(nameGLTF, function (gltf) {

        scene.add(gltf.scene);

        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;
    });
}