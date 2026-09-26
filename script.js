const menu=document.querySelector(".menu"),nav=document.querySelector(".site-header nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
const form=document.getElementById("orderForm");
const status=document.getElementById("formStatus");
form.addEventListener("submit",async(e)=>{
  e.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}
  const endpoint=form.getAttribute("action");
  if(endpoint.includes("YOUR_FORM_ID")){
    status.textContent="Your form is ready, but the Formspree endpoint has not been connected yet. Follow the publishing instructions in README.md.";
    status.style.color="#d8a95f";
    return;
  }
  status.textContent="Sending your order request…";
  const data=new FormData(form);
  try{
    const res=await fetch(endpoint,{method:"POST",body:data,headers:{Accept:"application/json"}});
    if(res.ok){
      form.reset();
      status.textContent="Thank you — your order request has been submitted successfully.";
      status.style.color="#d8a95f";
    }else{
      const body=await res.json().catch(()=>({}));
      status.textContent=body.errors?.map(x=>x.message).join(", ")||"Submission failed. Please try again.";
      status.style.color="#e18a7a";
    }
  }catch(err){
    status.textContent="Could not connect to the form service. Please check your internet connection and endpoint.";
    status.style.color="#e18a7a";
  }
});