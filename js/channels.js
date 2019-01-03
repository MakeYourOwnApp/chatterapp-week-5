const mockChannels = [{
        id: "0nlbop5f1e",
        name: "MeetUp",
        favorite: true,
        messages: [],
        latestMessage() {
            if (!!this.messages.length) {
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                return latest.toLocaleTimeString("de-DE", {
                    hour: "numeric",
                    minute: "numeric"
                })
            } else {
                return "No Messages"
            }
        }
    },
    {
        id: "6xwd0whqpv",
        name: "Oktoberfest",
        favorite: true,
        messages: [],
        latestMessage() {
            if (!!this.messages.length) {
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                return latest.toLocaleTimeString("de-DE", {
                    hour: "numeric",
                    minute: "numeric"
                })
            } else {
                return "No Messages"
            }
        }
    },
    {
        id: "pc2z0hhkyf",
        name: "Weather",
        favorite: false,
        messages: [],
        latestMessage() {
            if (!!this.messages.length) {
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                return latest.toLocaleTimeString("de-DE", {
                    hour: "numeric",
                    minute: "numeric"
                })
            } else {
                return "No Messages"
            }
        }
    },
    {
        id: "achndt7tst",
        name: "SevenContinents",
        favorite: false,
        messages: [],
        latestMessage() {
            if (!!this.messages.length) {
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                return latest.toLocaleTimeString("de-DE", {
                    hour: "numeric",
                    minute: "numeric"
                })
            } else {
                return "No Messages"
            }
        }
    }
];