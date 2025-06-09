document.getElementById('enviarBtn').addEventListener('click', () => {
    const indice = document.getElementById('indice').value;
    const imprimir = document.getElementById('imprimir').value;
  
    fetch('/form_method', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ indice, imprimir })
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById('respuesta').textContent = data.msg;
      })
      .catch(err => {
        console.error("Error:", err);
      });
  });
  
