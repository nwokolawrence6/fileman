module.exports = {
    "apps" : [
        {
            "name" : "cdn_file_management_server_production" ,
            "script" : "./index.js" ,
            env : {
                NODE_ENV : "production" ,
                PORT : 3003 ,
                DBURL : "mongodb://localhost:27017/cloudbooks" ,
                SECRETKEY : "dfklhfgiujkhdijhbfhuidjdhvbhufjhvfiugjbnomk" ,
                APP_NAME : "CDN_FILE_MANAGEMENT" ,
                payStackApiKey : "sk_test_6080860f7c2b24b23052e33bef3cca8121d4fd8a"
            }
        }
    ] ,
    deploy : {
        // "production" is the environment name
        production : {
            // SSH key path, default to $HOME/.ssh
            key : "/home/smarttech/.ssh/id_rsa" ,
            // SSH currentUserGql
            user : "root" ,
            // SSH host
            host : [ "35.239.23.116" ] ,
            // SSH options with no command-line flag, see 'man ssh'
            // can be either a single string or an array of strings
            ssh_options : "StrictHostKeyChecking=no" ,
            // GIT remote/branch
            ref : "origin/staging" ,
            // GIT remote
            repo : "git@gitlab.com:tb4ng/file-management.git" ,
            // path in the server
            path : "/root/cdn_file_management_server_production" ,
            // Pre-setup command or path to a script on your local machine
            // 'pre-setup': "cd ~/My_projects/App/cloudBooks_fronend && git push origin nstaging",
            // Post-setup commands or path to a script on the host machine
            // eg: placing configurations in the shared dir etc
            'post-setup' : "npm install; yarn build; pm2 start ecosystem.config.js" ,
            // pre-deploy action
            // 'pre-deploy-local': "echo 'This is a local executed command'",
            // post-deploy action
            'post-deploy' : "npm install; yarn build; pm2 restart cdn_file_management_server_production --update-env"
        }
    }
};
