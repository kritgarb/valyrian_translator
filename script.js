async function translateToValyrian(text) {
    const apiUrl = `https://api.funtranslations.com/translate/valyrian.json`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'text': text
            })
        });

        const data = await response.json();

        if (response.ok) {
            return data.contents.translated;
        } else {
            throw new Error(data.error.message);
        }
    } catch (error) {
        console.error("Translation error:", error);
        return "Translation failed. Please try again later.";
    }
}

document.getElementById("translateButton").addEventListener("click", async function() {
    let inputText = document.getElementById("inputText").value;

    if (inputText.trim() === "") {
        document.getElementById("outputText").innerText = "Please enter some text.";
        return;
    }

    document.getElementById("outputText").innerText = "Translating...";

    let translatedText = await translateToValyrian(inputText);

    document.getElementById("outputText").innerText = translatedText;
});
