import * as constants from "./const.js";

export function displayUserInfo(data) {
  constants.loginSection.style.display = "none";
  constants.userPage.style.display = "block";

  constants.lastName.innerText = data.data.user[0].lastName;
  constants.firstName.innerText = data.data.user[0].firstName;
  constants.email.innerText = data.data.user[0].email;
  constants.adresse.innerText =
    data.data.user[0].attrs.addressStreet +
    " " +
    data.data.user[0].attrs.addressComplementStreet +
    " " +
    data.data.user[0].attrs.addressPostalCode +
    " " +
    data.data.user[0].attrs.addressCity +
    " " +
    data.data.user[0].attrs.country +
    " ";
  constants.phone.innerText = data.data.user[0].attrs.Phone;
  constants.attents.innerText = data.data.user[0].attrs.attentes;

  constants.auditRatio.innerText = data.data.user[0].auditRatio;

  // Merci TheOldestBrother <3
  const currentDate = new Date();
  let minimumDate = new Date();
  let startXP = 0;
  minimumDate.setMonth(minimumDate.getMonth() - 6);
  let totalXP = 0;
  const validTx = data.data.transaction.filter((tx) => {
    const date = new Date(tx.createdAt);
    totalXP += tx.amount;
    if (date < minimumDate) startXP += tx.amount;
    return date >= minimumDate;
  });
  const stepHor = (currentDate - minimumDate) / 100;
  const stepVert = (totalXP - startXP) / 100;
  let currentXP = startXP;
  const points = validTx.reduce((accumulator, tx) => {
    const currentDate = new Date(tx.createdAt);
    let displacementX = (currentDate - minimumDate) / stepHor;
    let displacementY = (currentXP - startXP + tx.amount) / stepVert;
    let x = Math.floor((450 / 100) * displacementX);
    let y = Math.floor(210 - (210 / 100) * displacementY);
    currentXP += tx.amount;
    return `${accumulator}${x},${y} `;
  }, "");
  console.log("🚀 ~ points ~ points:", points);
  // Merci TheOldestBrother <3

  constants.firstSVG.innerHTML = `
  <h4 class="text-center">Graphiques</h4>
  <p class="text-center">Ratio d'audit</p>
  <div class="text-center">
  ${generateBar(
    data.data.user[0].totalUp,
    data.data.user[0].totalDown,
    data.data.user[0].auditRatio
  )}
  </div>
  <h5 class="text-center pt-3">Evolution de l'XP</h5>
    <div>
        <svg viewBox="0 0 450 210" preserveAspectRatio="none" style="border: 2px solid black;">
            <polyline id="myLine" fill="none" stroke="#2681DC" stroke-width="2" points="${points}"></polyline>
        </svg>
    </div>
`;
}

function generateBar(totalUp, totalDown, auditRatio) {
  const total = totalUp + totalDown;
  const upPercentage = (totalUp / total) * 100;
  const downPercentage = (totalDown / total) * 100;
  const svg = `
        <div class="text-center">
          <pre>${Math.round(auditRatio * 100) / 100}</pre>
          <svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
            <rect width="${upPercentage}%" height="50" fill="#D9F7CD" />
            <text x="5" y="30" fill="black">${formatSize(totalUp)}</text>
            <text x="${upPercentage + 5}%" y="30" fill="black">${totalUp}</text>
            <rect x="${upPercentage}%" width="${downPercentage}%" height="50" fill="#FFC7C7" />
            <text x="${upPercentage + 5}%" y="30" fill="black">${formatSize(
    totalDown
  )}</text>
          </svg>
        </div>
    `;
  return svg;
}

const formatSize = (bytes) => {
  const formatAsMegabytes = (bytes) => {
    const sizeInMB = (bytes / (1000 * 1000)).toFixed(3);
    return `${sizeInMB} MB`;
  };

  const formatAsKilobytes = (bytes) => {
    let sizeInKB;
    if (bytes < 100000) {
      sizeInKB = bytes / 1000;
      return `${sizeInKB.toFixed(2)} kB`;
    } else {
      sizeInKB = Math.round(bytes / 1000);
      return `${sizeInKB} kB`;
    }
  };

  return bytes < 1000000 ? formatAsKilobytes(bytes) : formatAsMegabytes(bytes);
};
