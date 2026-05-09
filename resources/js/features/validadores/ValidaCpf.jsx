const validarCPF = (cpf) =>{
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontuação
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica tamanho e números iguais

    let t = 0;
    let r;
    let s = 0;

    // Cálculo dos dígitos verificadores
    for (let i = 1; i <= 9; i++) s = s + parseInt(cpf[i - 1]) * (11 - i);
    r = (s * 10) % 11;
    if (r === 10 || r === 11) r = 0;
    if (r !== parseInt(cpf[9])) return false;

    s = 0;
    for (let i = 1; i <= 10; i++) s = s + parseInt(cpf[i - 1]) * (12 - i);
    r = (s * 10) % 11;
    if (r === 10 || r === 11) r = 0;
    if (r !== parseInt(cpf[10])) return false;

    return true;
}

export default validarCPF

