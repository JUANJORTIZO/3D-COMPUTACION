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

    camera.position.set(-48.46,16,-0.07);
   /*  // grid helper
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper); */

    // axes
    /* const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
 */
    animate();

    crearluz("ambientel");

    crearluz("spotl");

    loadModel_objMtl("../models/obj_mtl/escenario/","throne.obj", "throne.mtl", 3);

    loadModel_objMtl("../models/obj_mtl/personaje/","knt.obj","knt.mtl", 2);


    loaderGLTF("../models/gltf/", "../models/gltf/Duck.gltf");

    cofrecosa();
    stateGame();
}

function crearluz(tipoluz) {

    switch (tipoluz) {

        case "pointl":

            const pointLight = new THREE.PointLight(0xfEAE9C0, 1, 100);
            pointLight.position.set(0, 5, 0);
            scene.add(pointLight);

            /* const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
            scene.add(pointLightHelper); */

            break;

        case "spotl":
            light = new THREE.SpotLight(0xffffff);
            light.position.set(20, 20, 20);
            light.rotation.y = 50;
            scene.add(light);

            /* const spotLightHelper = new THREE.SpotLightHelper(light);
            scene.add(spotLightHelper); */
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



function loadModel_objMtl(path, nameOBJ, nameMTL, size) {
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
            object.scale.set(size, size, size);
            // object.scale.set(5,5,5);
        });
    }); 

   
} 

function loaderGLTF(path, nameGLTF) {

    
    var gltfLoader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();

    dracoLoader.setDecoderPath(path);

    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(nameGLTF, function (gltf) {

        scene.add(gltf.scene);

        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;


        gltf.scene.position.set(0,0,2);
        gltf.scene.rotation.set(0,16,0)
    });
}


function cofrecosa(){
    const min = -30
    const max = 30;
    for (var i = 0; i < 5; i++) {
        var posx = Math.floor(Math.random() * (max - min + 5) + min);
        var posz = Math.floor(Math.random() * (max - min + 5) + min);
    
         
        var MaterialC = []= [new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/cofre/derecha.png')}),
        new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/cofre/caraCofre.png')}),
        new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/cofre/arriba.png')}),
        new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/cofre/arriba.png')}),
        new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/cofre/derecha.png')}),
        new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/cofre/derecha.png')})];
    
    
       const geometria = new THREE.BoxGeometry(1, 1, 1);
    
        /* const materialcubo = new THREE.MeshStandardMaterial ({color: 0xffffff,
                                        roughness: 0.5,
                                        metalness: 0.5,
                                        map:texture,
                                        side: THREE.DoubleSide,
                                        wireframe: false});
     */
        const meshcubo = new THREE.Mesh (geometria, MaterialC);
    
        meshcubo.position.set(posx,1.3,posz)
        meshcubo.scale.set(2,2,2);
    
    scene.add(meshcubo);
    console.log(i);
}

}

function stateGame(state) {
    switch(state) {
        case 'win':
            // audio & show img
            document.getElementById("win").style.display = "block";
          break;
        case 'lose':
            // audio & show img
            document.getElementById("lose").style.display = "block";
          break;
      }
}

function TemporizadorX(){

const temporizador = getElementById('temporizador')


} 