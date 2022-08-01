const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f47a70c393mshf28a096f8f866d4p1b46a1jsnb2114d78d16b",
    "X-RapidAPI-Host": "ip-geolocation-and-threat-detection.p.rapidapi.com",
  },
};

// el fetch devuelve una promesa
const fetchIpInfo = (ip) => {
  return (
    fetch(
      `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
      OPTIONS
    )
      //usamos await para dar traza a la promesa
      .then((res) => res.json())
      .catch((err) => console.error(err))
  );
};

const $ = (selector) => document.querySelector(selector);

// capturamos elemento del DOM, form del index.html
const $form = $("#form");
const $input = $("#input");
const $submit = $("#submit");
const $results = $("#results");

// escuchamos el evento
$form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = $input;
  if (!value) return;
  //definimos atributo para que el usuario no pueda dar mas clicks
  $submit.setAttribute("disbaled", "");
  $submit.setAttribute("aria-busy", "true");

  const ipInfo = await fetchIpInfo(value);

  if (ipInfo) {
    $results.innerHTML = JSON.stringify(ipInfo, null, 2);
  }

  // removemos los atributos para nueva busqueda
  $submit.removeAttribute("disbaled");
  $submit.removeAttribute("aria-busy");
});
