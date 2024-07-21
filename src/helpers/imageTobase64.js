const imageTobase64 = async (image) => {
    try {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        const data = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

        return data;
    } catch (error) {
        console.error("Error converting image to base64:", error);
        return null;
    }
};

export default imageTobase64;
