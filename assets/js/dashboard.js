function dashboard() {
  return {
    sidebarOpen: true,
    darkMode: false,
    search: '',
    users: [
      { id: 1, name: 'Omor Faruk', email: 'omor@example.com', role: 'Admin' },
      { id: 2, name: 'Mizi Rahman', email: 'mizi@example.com', role: 'Editor' },
      { id: 3, name: 'Arif Khan', email: 'arif@example.com', role: 'Viewer' },
    ],
    modalOpen: false,
    modalData: {},
    filteredUsers() {
      return this.users.filter(u =>
        u.name.toLowerCase().includes(this.search.toLowerCase()) ||
        u.email.toLowerCase().includes(this.search.toLowerCase()) ||
        u.role.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    init() {
      const ctx = document.getElementById('kpiChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{
            label: 'Users',
            data: [10, 20, 15, 25],
            backgroundColor: this.darkMode ? 'rgba(99, 102, 241, 0.7)' : 'rgba(59,130,246,0.7)'
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    },
    openModal(user = {}) {
      this.modalData = {...user};
      this.modalOpen = true;
    },
    saveUser() {
      if(this.modalData.id) {
        const idx = this.users.findIndex(u => u.id === this.modalData.id);
        this.users[idx] = {...this.modalData};
      } else {
        this.modalData.id = Date.now();
        this.users.push({...this.modalData});
      }
      this.modalOpen = false;
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }
}
