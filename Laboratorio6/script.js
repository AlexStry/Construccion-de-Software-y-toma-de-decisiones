document.getElementById("password").addEventListener("focus", () => {
    document.getElementById("ayuda-password").style.display = "block";
  });

  document.getElementById("confirmar").addEventListener("focus", () => {
    document.getElementById("ayuda-confirmar").style.display = "block";
  });
  
  document.getElementById("confirmar").addEventListener("input", () => {
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmar").value;
    const mensaje = document.getElementById("mensaje-validacion");
    if (confirm === "") {
      mensaje.textContent = "";
    } else if (pass === confirm) {
      mensaje.textContent = "✅ Contraseñas coinciden";
      mensaje.style.color = "green";
    } else {
      mensaje.textContent = "❌ Las contraseñas no coinciden";
      mensaje.style.color = "red";
    }
  });
  
  document.getElementById("titulo").addEventListener("mouseover", () => {
    document.getElementById("titulo").style.color = "#FF4081";
    document.getElementById("titulo").style.fontSize = "2.2em";
  });
  
  document.getElementById("titulo").addEventListener("mouseout", () => {
    document.getElementById("titulo").style.color = "#2E7D32";
    document.getElementById("titulo").style.fontSize = "2em";
  });
  

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", "validar");
  }
  
  function drop(ev) {
    ev.preventDefault();
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmar").value;
    const dropzone = document.getElementById("dropzone");
    if (pass === confirm && pass.length >= 8) {
      dropzone.textContent = "✅ Validación completa!";
      dropzone.style.backgroundColor = "#c8e6c9";
    } else {
      dropzone.textContent = "❌ Las contraseñas no coinciden o son débiles.";
      dropzone.style.backgroundColor = "#ffcdd2";
    }
  }
  
  
