// Alert class to fetches and display alerts from the alerts.json file
export default class Alert {
  constructor(alertInfo) {
    this.alertInfo = alertInfo;
  }

  async render(parentElement) {
    const response = await fetch(this.alertInfo);
    const alerts = await response.json();

    if (alerts.length > 0) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");

      alerts.forEach((alert) => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertElement.style.padding = "10px";
        alertElement.style.margin = "5px 0";
        alertElement.style.borderRadius = "5px";

        alertSection.appendChild(alertElement);
      });

      parentElement.prepend(alertSection); // this puts the alert at the top of the main element
    }
  }
}
