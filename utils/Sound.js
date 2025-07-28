import { Asset } from 'expo-asset';


export async function loadSound(correctSound, incorrectSound , setSoundURIs) {
    try {
        const correctAsset = Asset.fromModule(correctSound);
        const incorrectAsset = Asset.fromModule(incorrectSound);

        await Promise.all([correctAsset.downloadAsync(), incorrectAsset.downloadAsync()]);

        setSoundURIs({
            correct: correctAsset,
            incorrect: incorrectAsset,
        });
    } catch (error) {
        console.error("Failed to load game sounds:", error);
    }
}

export async function playSound(player, soundURI) {
    if (!soundURI || !player) {
        console.log("Sound URI or player not ready.");
        return;
    }

    try {
        player.replace(soundURI); // Use the resolved URI string
        await player.play();
    } catch (error) {
        console.error("Error playing game sound:", error);
    }
}