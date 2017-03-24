/**
 * Member photo swapping behavior.
 */

const Vue = require('vue/dist/vue.common')

const members = new Vue({
  el: '#section-members',
  delimiters: ['#{', '}'],
  data: {
    started: true,
    members: [
      { name: 'recidive', image: '/images/members/1.jpg' },
      { name: 'italo', image: '/images/members/3.jpg' },
      { name: 'anderson', image: '/images/members/4.jpg' },
      { name: 'mari', image: '/images/members/5.jpg' },
      { name: 'reva', image: '/images/members/6.jpg' },
      { name: 'lucas', image: '/images/members/7.jpg' },
      { name: 'joseph', image: '/images/members/8.jpg' },
      { name: 'celso', image: '/images/members/9.jpg' },
      { name: 'becker', image: '/images/members/10.jpg' },
      { name: 'sebas', image: '/images/members/12.jpg' },
      { name: 'ban', image: '/images/members/13.jpg' },
      { name: 'rafa', image: '/images/members/14.jpg' },
      { name: 'helal', image: '/images/members/16.jpg' },
      { name: 'marcos', image: '/images/members/17.jpg' },
      { name: 'recidive', image: '/images/members/1.jpg' },
      { name: 'italo', image: '/images/members/3.jpg' },
    ]
  },
  methods: {
    swipe: function (member) {
      const index = this.members.indexOf(member)
      const result = shuffle(this.members).filter(curr => curr !== member)
      result.splice(index, 0, member)

      this.members = result
    }
  }
})

function shuffle (array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
