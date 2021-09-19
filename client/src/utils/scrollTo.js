export default function scrollTo(position = 0){
    window.scrollTo({
        top: position,
        behavior: "smooth"
      });
}