leanes-queryable-addon
================================

LeanES addon for use Query objects.

## CoffeeScript code guidelines
[google document](https://docs.google.com/a/saifas.com/document/d/114zNDimqXbdF76nnKBUqDfZoKd7xn6c7V14Fb7jOlk0/edit?usp=sharing)


## Tasks

https://trello.com/b/zUraHz54/leanes

## Known build error

Broccoli-rollup util displays an following error after `./npm run build`

```
ENOENT: no such file or directory, lstat '/tmp/broccoli-1810tEVgkQcna6/cache-1-broccoli_rollup_lean_es/build/affcbe8c4417cb3549637777f7bc87'
        at BroccoliRollup (LeanES)
-~- created here: -~-
    at new Plugin (/usr/src/leanes/node_modules/broccoli-rollup/node_modules/broccoli-plugin/index.js:31:32)
    at new BroccoliRollup (/usr/src/leanes/node_modules/broccoli-rollup/dist/index.js:15:9)
    at Object.<anonymous> (/usr/src/leanes/Brocfile.js:17:10)
    at Object.<anonymous> (/usr/src/leanes/node_modules/esm/esm.js:1:251206)
    at /usr/src/leanes/node_modules/esm/esm.js:1:245054
    at Generator.next (<anonymous>)
    at bl (/usr/src/leanes/node_modules/esm/esm.js:1:245412)
    at kl (/usr/src/leanes/node_modules/esm/esm.js:1:247659)
    at Object.u (/usr/src/leanes/node_modules/esm/esm.js:1:287740)
    at Object.o (/usr/src/leanes/node_modules/esm/esm.js:1:287137)
-~- (end) -~-


Stack Trace and Error Report: /tmp/error.dump.b981366098a6d223770d1ff78180f99b.log
```

But it made correct build result in `/lib`
I couldn't find a solution fo fix it (this error becames from `rollup-plugin-node-globals`)

## Additional information useful but not for deploy

### Absent permissions bug
`docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.40/containers/create?name=spawebclient: dial unix /var/run/docker.sock: connect: permission denied.`

Can be solved:

```
sudo groupadd docker
sudo usermod -aG docker $USER
mkdir /home/"$USER"/.docker
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
sudo chmod 666 /var/run/docker.sock
export COMPOSE_TLS_VERSION=TLSv1_2
```

### Install docker

`sudo apt-get update`

```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

```

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

`sudo apt-key fingerprint 0EBFCD88`

```
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

```

`sudo apt-get update`

```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

`sudo chmod +x /usr/local/bin/docker-compose`

`sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose`

```
curl -L "https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-$(uname -s)-$(uname -m)" -o /tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

```

### Install Virtualbox

```
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add - &&
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add - &&
echo "deb [arch=amd64] https://download.virtualbox.org/virtualbox/debian $(lsb_release -sc) contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list &&
sudo apt update &&
sudo apt install virtualbox-6.1

```

### Virtualbox problems

```
cat << EOF | docker-machine ssh default sudo tee /var/lib/boot2docker/bootsync.sh > /dev/null
ifconfig eth1 192.168.99.100 netmask 255.255.255.0 broadcast 192.168.99.255 up
ip route add default via 192.168.99.1
EOF
```

```
VBoxManage dhcpserver remove --ifname vboxnet0 &&
docker-machine restart default &&
docker-machine regenerate-certs default -f &&
docker-machine env default
```

`sudo ifconfig vboxnet0 down && sudo ifconfig vboxnet0 up`

if it doesn't work needs change

`/home/user/.config/VirtualBox/HostInterfaceNetworking-vboxnet0-Dhcpd.leases`

### Docker build stopped and doesn't work
It may be obtained after command above.
I could see the error only after calling the command with 'sudo'
Error:
```
double free or corruption (out)
SIGABRT: abort
PC=0x7f9dfb6b0e97 m=0 sigcode=18446744073709551610
signal arrived during cgo execution

goroutine 1 [syscall, locked to thread]:
runtime.cgocall(0x4afd50, 0xc42004dcc0, 0xc42004dce8)
        /usr/lib/go-1.8/src/runtime/cgocall.go:131 +0xe2 fp=0xc42004dc90 sp=0xc42004dc50
github.com/docker/docker-credential-helpers/secretservice._Cfunc_free(0x18bb920)
        github.com/docker/docker-credential-helpers/secretservice/_obj/_cgo_gotypes.go:111 +0x41 fp=0xc42004dcc0 sp=0xc42004dc90
github.com/docker/docker-credential-helpers/secretservice.Secretservice.List.func5(0x18bb920)
        /build/golang-github-docker-docker-credential-helpers-cMhSy1/golang-github-docker-docker-credential-helpers-0.5.0/obj-x86_64-linux-gnu/src/github.com/docker/docker-credential-helpers/secretservice/secretservice_linux.go:96 +0x60 fp=0xc42004dcf8 sp=0xc42004dcc0
github.com/docker/docker-credential-helpers/secretservice.Secretservice.List(0x0, 0x756060, 0xc4200742c0)
        /build/golang-github-docker-docker-credential-helpers-cMhSy1/golang-github-docker-docker-credential-helpers-0.5.0/obj-x86_64-linux-gnu/src/github.com/docker/docker-credential-helpers/secretservice/secretservice_linux.go:97 +0x217 fp=0xc42004dda0 sp=0xc42004dcf8
github.com/docker/docker-credential-helpers/secretservice.(*Secretservice).List(0x77e548, 0xc42004de88, 0x410022, 0xc420074220)
        <autogenerated>:4 +0x46 fp=0xc42004dde0 sp=0xc42004dda0
github.com/docker/docker-credential-helpers/credentials.List(0x756ba0, 0x77e548, 0x7560e0, 0xc420092008, 0x0, 0x10)
        /build/golang-github-docker-docker-credential-helpers-cMhSy1/golang-github-docker-docker-credential-helpers-0.5.0/obj-x86_64-linux-gnu/src/github.com/docker/docker-credential-helpers/credentials/credentials.go:145 +0x3e fp=0xc42004de68 sp=0xc42004dde0
github.com/docker/docker-credential-helpers/credentials.HandleCommand(0x756ba0, 0x77e548, 0x7ffc728d9776, 0x4, 0x7560a0, 0xc420092000, 0x7560e0, 0xc420092008, 0x40e398, 0x4d35c0)
        /build/golang-github-docker-docker-credential-helpers-cMhSy1/golang-github-docker-docker-credential-helpers-0.5.0/obj-x86_64-linux-gnu/src/github.com/docker/docker-credential-helpers/credentials/credentials.go:60 +0x16d fp=0xc42004ded8 sp=0xc42004de68
github.com/docker/docker-credential-helpers/credentials.Serve(0x756ba0, 0x77e548)
        /build/golang-github-docker-docker-credential-helpers-cMhSy1/golang-github-docker-docker-credential-helpers-0.5.0/obj-x86_64-linux-gnu/src/github.com/docker/docker-credential-helpers/credentials/credentials.go:41 +0x1cb fp=0xc42004df58 sp=0xc42004ded8
main.main()
        /build/golang-github-docker-docker-credential-helpers-cMhSy1/golang-github-docker-docker-credential-helpers-0.5.0/secretservice/cmd/main_linux.go:9 +0x4f fp=0xc42004df88 sp=0xc42004df58
runtime.main()
        /usr/lib/go-1.8/src/runtime/proc.go:185 +0x20a fp=0xc42004dfe0 sp=0xc42004df88
runtime.goexit()
        /usr/lib/go-1.8/src/runtime/asm_amd64.s:2197 +0x1 fp=0xc42004dfe8 sp=0xc42004dfe0

goroutine 17 [syscall, locked to thread]:
runtime.goexit()
        /usr/lib/go-1.8/src/runtime/asm_amd64.s:2197 +0x1
```
Bug issue in docker:
https://github.com/docker/docker-credential-helpers/issues/103

It may be appear after installation an old version "0.5.0" of the "docker-credential-helpers"

`sudo apt-get install golang-docker-credential-helpers`

Run to fix it and restart PC

`sudo dpkg -r --force-depends golang-docker-credential-helpers`

### Compaction for mongodb

```
db.getCollectionNames().forEach(function (collectionName) {
    db.runCommand({ compact: collectionName, force: true });
});
```

### VPN maybe needs

- Go to https://www.freeopenvpn.org/logpass/netherlands.php
- Download https://www.freeopenvpn.org/ovpn/Netherlands_freeopenvpn_tcp.ovpn into `/vpn` folder
- Make txt file `nano ~/vpn/Netherlands_credentials.txt` and add in 1'st line username `freeopenvpn` and 2'nd line <temp pass from website> and 3'rd line empty needs add too.
- Run `sudo openvpn --config ~/vpn/Netherlands_freeopenvpn_tcp.ovpn --auth-user-pass ~/vpn/Netherlands_credentials.txt`
- If error occured maybe needs edit `Netherlands_freeopenvpn_tcp.ovpn` and set/remove some config if it's disallowed

### Sometimes maybe useful

`sudo service network-manager restart`

### Troubleshooting

You will have to remove the container `docker rm container_id` and run `docker-compose up` again.
