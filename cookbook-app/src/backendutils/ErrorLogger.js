export function logError(error) {
    fetch('/logError/', {
        method: 'POST',
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body: JSON.stringify(error)
    }
    );
}
