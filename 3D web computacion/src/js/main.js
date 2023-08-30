/* Author : Juan Jose Ortiz Ocampo 
   Date of creation: 23/08/2023
   Last modification: 29/08/2023
*/

//creation elements

var scene = null,
    camera = null,
    renderer = null,
    control = null,
    cube = null,
    torus = null,
    torusKnot = null;
   

    const size = 10;
    const divisions = 10;
    
var material, mesh, geometria, figura=[];

function StarScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xB8E3A4);
    camera = new THREE.PerspectiveCamera(75 // ángulo de vision 
        , window.innerWidth / window.innerHeight, // relación aspecto 16:
        0.1, // Más cerca (no renderiza)
        1000); // Más lejos (no renderiza)


    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

//ORBITCONTROLS
    control = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0,0,0);
    control.update();
    
//OBJETOS
          
    camera.position.z = 5;
// grid helper
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );
    
// axes
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

animate();
//cuboa();


}


function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);

    for(let i=0; i< figura.length;i++){

        figura[i].rotation.x +=0.05;
        figura[i].rotation.z +=0.05;

    }
   
 } 


// resize
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// eligir forma 

 function dibujar(forma){

    
    switch (forma) {

        case "cubo" :


            geometria = new THREE.BoxGeometry(1, 1, 1);

        break;

        case "toru" :

            geometria = new THREE.TorusGeometry( 0.5, 0.3, 10, 100 );   
 
        break;

        case "knot":
 
            geometria= new THREE.TorusKnotGeometry( 0.5, 0.5, 100, 12, ); 
           
            break;

            }


            material= new THREE.MeshBasicMaterial( { color: 0xEC7ADD, wireframe: true } );

            mesh=  new THREE.Mesh( geometria, material );

            mesh.position.x = Math.random() * -(9- 1) + 4.05;
            mesh.position.z = Math.random() * -(9- 1) + 4.05;

            scene.add(mesh);
            
            figura.push(mesh);
 }


/*function generarcubo(){


  
        const geometrycube = new THREE.BoxGeometry(1, 1, 1);
        const materialcube = new THREE.MeshBasicMaterial({ color: 0xE24141, wireframe: true  });
         cube = new THREE.Mesh(geometrycube, materialcube);
         scene.add(cube);
         
         cube.position.x = Math.random() * (3- 0) + 1;
         cube.position.z = Math.random() * (3- 0) + 1;
        
         

 } */
 

/*  function generartoru(){

    const geometrytorus = new THREE.TorusGeometry( 1, 0.5, 16, 100 ); 
    const materialtorus = new THREE.MeshBasicMaterial( { color: 0xEC7ADD, wireframe: true } ); 
          torus = new THREE.Mesh( geometrytorus, materialtorus ); 
          scene.add( torus );

          

          torus.position.x = Math.random() * (3- 0) + 1;
          torus.position.z = Math.random() * (3- 0) + 1;

          animate();

          
 } */


 /* function generarknot(){

    const geometry = new THREE.TorusKnotGeometry( 1, 0.5, 100, 16, ); 
    const material = new THREE.MeshBasicMaterial( { color: 0x7A7FEC , wireframe: true } ); 
     torusKnot = new THREE.Mesh( geometry, material ); scene.add( torusKnot );

     torusKnot.position.x = Math.floor(Math.random() * max);

    
 } */
          



 
         

        
 
 
 
 


