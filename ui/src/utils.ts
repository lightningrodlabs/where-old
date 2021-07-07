export const bufferToBase64 = buffer => {
  if (typeof window !== "undefined") {
    // browser
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  } else {
    // nodejs
    return buffer.toString('base64')
  }
}

export const base64ToBuffer = base64 => {
  if (typeof window !== "undefined") {
    return Uint8Array.from(window.atob(base64), c => c.charCodeAt(0))
  } else {
    return Buffer.from(base64, 'base64');
  }
}
