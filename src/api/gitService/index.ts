import {ajax} from 'rxjs/ajax'

class GitService {
    pathname = 'api.github.com/users'
    fetchGitUser = (username: string) => ajax.getJSON(`${this.pathname}/${username}`);
}

export const  gitService = new GitService();