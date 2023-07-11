const link = document.querySelector('a[href="#top"]');
const aboutLink = document.querySelector('a[href="#about"]');
link.addEventListener('click', function(event) {
event.preventDefault();
const topPos = 0;
window.scrollTo({
    top: topPos,
    behavior: 'smooth'
});
header.classList.remove('sticky');
});
aboutLink.addEventListener('click', function(event) {
    event.preventDefault();
    const aboutPos = document.querySelector('#about').offsetTop;
    window.scrollTo({
    top: aboutPos,
    behavior: 'smooth'
    });
});
function generateGallery() {
    const gallery = document.querySelector('.gallery');
    const columns = document.querySelectorAll('.column');
    const totalImages = 32;
    const margin = 15; 
    const maxWidth = gallery.clientWidth / 3 - margin;
    
 
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `gallery/img${i}.png`;
        img.alt = `Image ${i}`;
    
        // Calculate optimal height for each image
        img.onload = function () {
          const height = img.height;
          const optimalHeight = (maxWidth / img.width) * height;
          img.style.height = `${optimalHeight}px`;
        }
    
        // Append image to the column with the smallest height
        let minHeight = columns[0].offsetHeight;
        let minIndex = 0;
        for (let j = 1; j < columns.length; j++) {
          const height = columns[j].offsetHeight;
          if (height < minHeight) {
            minHeight = height;
            minIndex = j;
          }
        }
        columns[minIndex].appendChild(img);
    }
}
generateGallery();
const images = document.querySelectorAll('.column img');

images.forEach((image) => {
  image.addEventListener('click', (event) => {
    // create a new image element for the zoomed-in version
    const zoomedImg = document.createElement('img');
    zoomedImg.src = event.target.src;
    zoomedImg.classList.add('zoomed-image');

    // add the zoomed-in image to the body
    document.body.appendChild(zoomedImg);

    // add a blurred background
    const blurredBackground = document.createElement('div');
    blurredBackground.classList.add('blurred-background');
    document.body.appendChild(blurredBackground);

    // disable clicking on other images while zoomed-in
    images.forEach((img) => {
      img.style.pointerEvents = 'none';
    });
    // close the zoomed image when clicking
    const closeZoomedImg = () => {
      zoomedImg.remove();
      blurredBackground.remove();
      images.forEach((img) => {
        img.style.pointerEvents = 'auto';
      });
      document.body.removeEventListener('click', closeZoomedImg);
    };
    setTimeout(() => {
      document.body.addEventListener('click', closeZoomedImg);
    }, 0);
  });
});