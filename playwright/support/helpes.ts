export function gerarCodigoPedido() {
    const prefixo = "VLO";
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    let sufixo = "";
  
    for (let i = 0; i < 6; i++) {
      sufixo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
  
    return `${prefixo}-${sufixo}`;
  }