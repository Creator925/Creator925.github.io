const messageInput = document.getElementById("message-content");
const submitBtn = document.getElementById("submit-btn");
const noMessage = document.getElementById("no-message");

submitBtn.addEventListener("click", () => {
	const currentMessage = messageInput.value;
	if(currentMessage === ""){
		alert("请输入留言后重新尝试");
		return ;
	}
	else if(currentMessage){
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const message = `${year}-${month}-${day} ${hours}:${minutes} ${currentMessage}`;
		const HTMLString = `
		<div id="no-message" class="no-message">${message}</div>`;
		
		noMessage.insertAdjacentHTML("beforeend", HTMLString);
	}
})