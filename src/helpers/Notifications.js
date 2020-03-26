
export default {
  name: 'Notifications',
  methods: {
    notifyPositive(msg){
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: msg,
      });
    },
    notifyNegative(msg) {
      this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: msg,
        });
    },
  },
};

/*
'You need to accept the license and terms first'
'Logged In Successfully'
'The popup has been closed by the user before finalizing the operation.'

*/
