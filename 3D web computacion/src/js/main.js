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
    light = null,
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


crearluz("spotl");
crearluz( "pointl");

animate();



}

function crearluz(tipoluz){

        switch(tipoluz){

            case "pointl":

            const pointLight = new THREE.PointLight( 0xfEAE9C0, 1, 100 );
            pointLight.position.set( 0, 5, 0 );
            scene.add(pointLight );
            
            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
            scene.add( pointLightHelper );

            break;
            
            case "spotl":
                light = new THREE.SpotLight( 0xffffff );
                light.position.set( 10, 10, 10 );
                scene.add( light );

                const spotLightHelper = new THREE.SpotLightHelper( light );
                scene.add( spotLightHelper );
            break;

            case "ambientel":
                light = new THREE.AmbientLight( 0x404040 ); // soft white light
                scene.add( light );
            break;



        }
   
    



}




function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);

    for(let i=0; i< figura.length;i++){

        figura[i].rotation.x +=0.02;
        figura[i].rotation.z +=0.02;

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

            const texture = new THREE.TextureLoader().load('../images/animals/face1.jpg'); 

            var MaterialC = []= [new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/animals/face1.jpg')}),
                                    new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/animals/face2.png')}),
                                    new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/animals/face3.jpg')}),
                                    new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/animals/face4.jpg')}),
                                    new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/animals/face5.png')}),
                                    new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../images/animals/face6.jpg')})];


            geometria = new THREE.BoxGeometry(1, 1, 1);

            const materialcubo = new THREE.MeshStandardMaterial ({color: 0xffffff,
                                                                    roughness: 0.5,
                                                                    metalness: 0.5,
                                                                    map:texture,
                                                                    side: THREE.DoubleSide,
                                                                    wireframe: false});

            const meshcubo = new THREE.Mesh (geometria, MaterialC);

            scene.add(meshcubo);

            meshcubo.position.x = Math.random() * -(9- 1) + 4.05;
            meshcubo.position.z = Math.random() * -(9- 1) + 4.05;

            figura.push(meshcubo);
        
        break;

        case "toru" :

             geometria = new THREE.TorusGeometry( 0.5, 0.3, 10, 100 );   

            const materialtorus = new THREE.MeshStandardMaterial ({color: 0xEC7ADD, roughness: 0.5, metalness: 0.5 });
            const meshtoru = new THREE.Mesh (geometria, materialtorus);

            scene.add(meshtoru);

            meshtoru.position.x = Math.random() * -(9- 1) + 4.05;
            meshtoru.position.z = Math.random() * -(9- 1) + 4.05;

            figura.push(meshtoru);
 
        break;

        case "knot":
 
            geometria= new THREE.TorusKnotGeometry( 0.5, 0.5, 100, 12, ); 
           
            break;

            }

           


           /*  material= new THREE.MeshBasicMaterial( { color: 0xEC7ADD,  transparent:true, opacity: 0.5, wireframe: true } );
            
            mesh=  new THREE.Mesh( geometria, material );

            mesh.position.x = Math.random() * -(9- 1) + 4.05;
            mesh.position.z = Math.random() * -(9- 1) + 4.05;

            scene.add(mesh);
            
            figura.push(mesh); */

            
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
          



 
         

        
 
 
 
 


