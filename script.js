const qs = sel => document.querySelector(sel);
const get = id => parseFloat(qs(id).value) || 0;

const btnCalc = qs('#btnCalc');
const resSection = qs('#resultado');
const resCpp = qs('#resCpp');
const resGasto = qs('#resGasto');
const resTotal = qs('#resTotal');
const btnPdf = qs('#btnPdf');

btnCalc.addEventListener('click', () => {
  // valores
  const vh = get('#valorHardware');
  const tc = get('#tempoContrato');
  const vm = get('#volumeMensal');
  const vt = get('#valorToner');
  const dt = get('#durToner');
  const v1 = get('#valorSup1');
  const d1 = get('#durSup1');
  const v2 = get('#valorSup2');
  const d2 = get('#durSup2');

  // cálculos
  const custoPg = vt/dt + v1/d1 + v2/d2;
  const gastoSup = custoPg * vm * tc;
  const totalInv = vh + gastoSup;

  // exibir
  resCpp.textContent = custoPg.toFixed(4);
  resGasto.textContent = gastoSup.toFixed(2);
  resTotal.textContent = totalInv.toFixed(2);
  resSection.classList.remove('hidden');
});

// gerar PDF
btnPdf.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("CPP Break‑Even · Reis Office", 20, 20);

  doc.autoTable({
    startY: 30,
    head: [["Item","Valor"]],
    body: [
      ["Custo p/ Página (R$)", resCpp.textContent],
      ["Gasto Total Suprimentos (R$)", resGasto.textContent],
      ["Valor Total Investimento (R$)", resTotal.textContent],
    ]
  });
  doc.save("CPP-Reis-Office.pdf");
});