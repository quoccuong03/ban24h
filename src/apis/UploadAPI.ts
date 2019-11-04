import firebase from "firebase/app"

export default class UploadFile {
	static async uploadMutipleFile(ImageFile) {
		const storage = firebase.storage()
		const storageRef = storage.ref()

		const metadata = {
			contentType: "image/jpeg"
		}
		let result 
		try{
            const uploadTask = await storageRef
			.child("images_dangtin/" + ImageFile.name)
            .put(ImageFile, metadata)
			.then(uploadTask => {
				return uploadTask.ref.getDownloadURL().then(url => {
                    result={}
					result["isSuccess"] = true
                    result["url"] = url
					return result
                })
                
			})
    
        }catch(error){
            result={}
            result['isSuccess'] = false;
            result['errorCode'] = error.code;
            return result
        }
	   return result
	}
}
