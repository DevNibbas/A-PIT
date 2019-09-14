import { CrudService } from './../../crud.service';
import { IDBContract } from './IDBContract';
export class History {
    allHistory: any[];
    activatedHistory;
    user: any;
    constructor(private db: CrudService) {
        this.user = JSON.parse(localStorage.getItem('userid'));
        this.getAllHistory();

    }


    getAllHistory() {
        if (!this.db.isDBOpened()) {
            return null;
        } else {
            return this.db.getRequestHistory(this.user[0]).then(res => {
                this.allHistory = res;
            });
        }

    }
    saveHistory(history: any) {
        this.db.addRequestHistory(history).then(id => {
            history.id = id;
            this.allHistory.push(history);
        });

    }


    loadMoreHistory() {
        // function for lazy load
    }

    deleteHist(id) {

    }


    deleteAllHistory() {
        const x = confirm('you naughty.. want to clear your history :)- ');
        // function for delete  all history
    }

    toggleHistoryList(index) {
        if (this.activatedHistory === this.allHistory[index].id) {
            this.activatedHistory = undefined;
        } else {
            this.activatedHistory = this.allHistory[index].id;
        }
    }


}

