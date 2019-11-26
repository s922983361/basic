export default {
    methods: {
        async getImageFileName(imageUrl) {
            let path = '/uploads/' + this.uploadDir + '/'
            let str = process.env.baseUrl + path
            let fileName = imageUrl.substring(str.length)
            this.FileName = fileName
        },
    }
}        