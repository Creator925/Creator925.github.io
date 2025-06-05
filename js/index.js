document.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submit-btn');
	const messageContent = document.getElementById('message-content');
	const messagesContainer = document.querySelector('.messages-container');
	
	// 加载本地存储的留言
	loadMessages();
	
	// 提交留言
	submitBtn.addEventListener('click', function() {
		const username = document.getElementById('username').value.trim();
		const content = messageContent.value.trim();
		const contact = document.getElementById('contact').value.trim();  //trim() 去除前后空格
		
		if (!content) {
			alert('留言内容不能为空！');
			return;
		}
		
		// 创建留言对象
		const message = {
			username: username || '匿名用户',  //用户名为空 -> '匿名用户'
			content: content,
			contact: contact,
			timestamp: new Date().toLocaleString()
		};
		
		// 保存留言
		saveMessage(message);
		
		// 清空输入框
		messageContent.value = '';
		document.getElementById('contact').value = '';
		
		// 重新加载留言
		loadMessages();
		
		alert('留言提交成功！');
	});
	
	// 保存留言到本地存储
	function saveMessage(message) {
		let messages = JSON.parse(localStorage.getItem('generalist_messages') || '[]');
		messages.unshift(message); // 最新留言放在最前面
		if (messages.length > 50) {
			messages = messages.slice(0, 50); // 最多保存50条
		}
		localStorage.setItem('generalist_messages', JSON.stringify(messages));
	}
	
	// 从本地存储加载留言
	function loadMessages() {
		const messages = JSON.parse(localStorage.getItem('generalist_messages') || []);
		messagesContainer.innerHTML = '';
		
		if (messages.length === 0) {
			messagesContainer.innerHTML = '<div class="no-message">暂无留言，快来第一个留言吧~</div>';
			return;
		}
		
		messages.forEach(msg => {
			const messageElement = document.createElement('div');
			messageElement.className = 'message-item';
			messageElement.innerHTML = `
				<div class="message-header">
					<span class="message-user">${msg.username}</span>
					<span class="message-time">${msg.timestamp}</span>
				</div>
				<div class="message-body">${msg.content}</div>
				${msg.contact ? `<div class="message-contact">联系方式：${msg.contact}</div>` :''}
				<div class="message-divider"></div>
			`;
			messagesContainer.appendChild(messageElement);
		});
	}
});