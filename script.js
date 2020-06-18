let mapping = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};
let textdiv,
  speech_to_txtdiv,
  speech_to_line,
  str = "",quotesdiv,quote;
const options = { probabilityThreshold: 0.7 };
const classifier = ml5.soundClassifier(
  "SpeechCommands18w",
  options,
  modelReady
);
async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  if (data) {
    // console.log(`${data.content} —${data.author}`);
    quote = `${data.content} —${data.author}`;
    return quote;
  }
}

function setup() {
  textdiv = document.getElementById("banner_text");
  speech_to_txtdiv = document.getElementById("speech_to_txtdiv");
  speech_to_line = document.getElementById("speech_to_line");
  quotesdiv = document.getElementById("ran_quote");
  randomQuote().then((qt)=>{quotesdiv.innerHTML=`<h3>${qt}</h3>`});
  textdiv.innerHTML = "Initializing";
  
  


}

function modelReady() {
  // classify sound
  textdiv.innerHTML = "<h2>Model Is Ready..Speak Numbers like 1,2,3...</h2>";
  setInterval(() => {
    classifier.classify(gotResult);
  }, 1000);
}

function gotResult(error, result) {
  if (error) {
    // console.log(error);
    return;
  }
  // log the result
  // console.log(result);
  if (mapping[result[0].label] != undefined && result[0].confidence >= 0.85) {
    str = str + mapping[result[0].label] + "  ";
    speech_to_txtdiv.innerHTML = mapping[result[0].label];
    speech_to_line.innerHTML = str;
  }

  if(result[0].label=="_background_noise_" && result[0].confidence >= 0.85)
  {
    speech_to_txtdiv.innerHTML = "background noise..."
  }
  if(result[0].label=="_unknown_" && result[0].confidence >= 0.85)
  {
    speech_to_txtdiv.innerHTML = "trying..."
  }

}
