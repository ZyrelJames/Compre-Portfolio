document.addEventListener('DOMContentLoaded',()=>{
  const main = document.getElementById('mainImage');
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  const cards = Array.from(document.querySelectorAll('.card'));
  let selected = thumbs.find(t=>t.classList.contains('active')) || thumbs[0];
  let selectedSrc = selected?.dataset.large || main.src;

  function fadeTo(src){
    if(!src) return;
    main.style.transition='opacity .22s ease';
    main.style.opacity=0;
    setTimeout(()=>{
      main.src=src;
      main.style.opacity=1;
    },220);
  }

  thumbs.forEach(t=>{
    t.addEventListener('click',e=>{
      thumbs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      selected = t;
      selectedSrc = t.dataset.large;
      fadeTo(selectedSrc);
    });

    t.addEventListener('mouseenter',()=>{
      // preview on hover
      fadeTo(t.dataset.large);
    });
    t.addEventListener('mouseleave',()=>{
      // revert to selected
      fadeTo(selectedSrc);
    });
  });

  cards.forEach(c=>{
    c.addEventListener('click',()=>{
      const large = c.dataset.large;
      // clear active thumbs
      thumbs.forEach(x=>x.classList.remove('active'));
      selected = null; selectedSrc = large;
      fadeTo(large);
    });
  });

  // Smooth initial load
  main.style.opacity=1;
});
