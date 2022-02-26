export default async context => {
  await context.store.dispatch('clientHook', context);
  document.querySelectorAll('.ripple-effect').forEach(element=>{element.onclick = (event) => {
    let element = event.target.closest('.ripple-effect');
    let { width, height, x: element_x, y: element_y } = element.getBoundingClientRect();
    const x_coordinate = event.clientX - parseInt(element_x);
    const y_coordinate = event.clientY - parseInt(element_y);
    const max_side = Math.max(width, height);
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    element.appendChild(ripple);
    Object.assign(ripple.style, {
      left: x_coordinate + 'px',
      top: y_coordinate + 'px',
      width: max_side / 20 + 'px',
      height: max_side / 20 + 'px',
    })
    setTimeout(() => ripple.remove(), 1000)
  }});
  }