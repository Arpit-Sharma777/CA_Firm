// Aurora and Stars Background Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    
    // Set renderer size and add to hero section
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.querySelector('.hero').prepend(renderer.domElement);
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Camera position
    camera.position.z = 500;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate stars slowly
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0001;
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation
    animate();
    
//     // Aurora gradient animation
//     const colors = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
//     let currentColorIndex = 0;
//     const hero = document.querySelector('.hero');
    
//     function updateGradient() {
//         const nextColorIndex = (currentColorIndex + 1) % colors.length;
//         const gradient = `radial-gradient(125% 125% at 50% 0%, #020617 40%, ${colors[currentColorIndex]})`;
//         hero.style.background = gradient;
        
//         currentColorIndex = nextColorIndex;
//         setTimeout(updateGradient, 5000);
//     }
    
//     // Start gradient animation
//     updateGradient();
 });
