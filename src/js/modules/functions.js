
export function isWebp() {
    function testWebP(cb) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            console.dir(webP);
            cb(webP.height == 30);
        }
        webP.src = "data:image/webp;base64,UklGRrABAABXRUJQVlA4TKQBAAAvHUAHEIfCoJEkKTV7gAhc4N/ZOzYcNZLkSFG9vwVjjj8y28WgbSNJnmdJHIvjT+1u68a2baXB3aGE2iFV5pTRu+dd3g0YMK/X28y0gxsk3/mDUCgIAhAAhEKgIIAdX+z4B5YXBEogQsuVBkK4lRJuAqm6ZWfTT5qVrkkMF62BtqHuHYC0PlHs5jPHb8NNiuo905ztm9P53+ven02+f7DPd8w6wEWsbMOMeqlQyR8Z9w1R76SmwON9Tuf1vAExkm3T1nqa9899tm1927byT+dp3wwi+j8B0vgl7zB0+eeJpKMk5qljjZP4mLp7BrxK27DjAZ958KYyPd2BnoOybB8AB7RsdqOstpnF8ONyiB+hHH78lYBR3+q/AbiDltUHEF3I6hvgUVZ7UeA3sNH/b/znetWhBzQj2ugeqIaXLhJA8UabHQNUw9JtFshcaQt9AVTDfyVgdKKt9A5QrQFuLgO9sjq6kIleVz3KSK9LvwEzfUE9oi0clNfobP9fm3bBDcCbrtny3IPCG+BV2oYVD3iapPAxHdRxyi59Lunus+csXO8zKAE="
    }

    testWebP(function(support){
        let className = support ===true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}