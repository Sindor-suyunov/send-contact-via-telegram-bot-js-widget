let admins = []; // Chat ids of telegram admins
let bot_token = 'YOUR_TELEGRAM_BOT_TOKEN';

$('.scvtbjw').click(function () {
    Swal.fire({
        title: 'Contact Us',
        html:
            '<input type="text" id="scvtbjw-input-1" class="swal2-input" placeholder="Phone number">' +
            '<input type="text" id="scvtbjw-input-2" class="swal2-input" placeholder="Enter your name">',
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: () => {
            let phone = document.getElementById('scvtbjw-input-1').value;
            let name = document.getElementById('scvtbjw-input-2').value;
            if (phone === '' || name === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill contact form!',
                });
                return false;
            }
            let sent = false;
            let text = `🙎‍♂️  ${name}    ☎️ ${phone}`;
            for(let i = 0; i < admins.length; i++){
                $.ajax({
                    url:'https://api.telegram.org/bot'+bot_token+'/sendMessage',
                    method:'POST',
                    data: {
                        chat_id: admins[i],
                        text: text,
                    },
                    async: false,
                    success:function(){
                        sent = true;
                    },
                    error:function(){

                    }
                });
            }
            if (sent){
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you for contacting us, we will contact you as soon as possible ',
                    showConfirmButton: false,
                    timer: 3000
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        },
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                '',
                'success'
            )
        }
    })
})