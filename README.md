# Kubernetes

Example of a Kubernetes deployment for a simple web application.

## Storage

Creating a MySQL database with persistent storage by the application kube-storage.yaml

## Backend

Creating a backend application by the kube-backend.yaml.
Backend is an application that manages the database and exposes a REST API, created in Python 3.11.3 with Flask.

Kubectl needs the image container locally, so we need to build it and import into the microk8s container registry.

Use the Dockerfile to build the image.

```bash
docker build -t demo-backend:1.0 .
docker save -o demo-backend.tar demo-backend:1.0
microk8s ctr image import demo-backend:1.0
```

Now, we can able to apply the YAML file to kubernetes.

```bash
kubectl apply -f kube-backend.yaml
```

## Frontend

Creating a frontend application by the kube-frontend.yaml.
Frontend is an application that consumes the REST API exposed by the backend, created in NodeJS with express.

```bash
docker build -t demo-frontend:1.0 .
docker save -o demo-frontend.tar demo-frontend:1.0
microk8s ctr image import demo-frontend:1.0
```

Now, we can able to apply the YAML file to kubernetes.

```bash 
kubectl apply -f kube-frontend.yaml
```

## Multinode

With microk8s we can create a multinode cluster, but we need to enable the microk8s on all nodes and join them.

On each node (master included), we need to add the IP and the hostname of the other nodes in the file: /etc/hosts

```bash
sudo nano /etc/hosts
```

Adding in the end
    
```bash
<ip> <hostname>
10.10.0.100 master
10.10.0.101 node
```
Now, on master node, we ask microk8s how to join the cluster.

```bash
microk8s add-node
```

The command will return a command to run on the other nodes to join the cluster.

On the other nodes, we need to run the command returned by the master node.

```bash
microk8s join <ip>:<port>/<token>/<token>
```

## Registry

We can create a private registry to store our images. To do this we can use Sonatype Nexus 3.

Installed Nexus 3 (check 'registry/setup.sh' file for more details), you have to configure it in five steps:

* A blob store: to store the image files
* Hosted Repository: to store the images
* Proxy Repository: to download the images from the public registry
* Group Repository: to group the hosted and proxy repositories
* Docker configuration: to enable the docker registry

### Blob Store

To create a blob store, go to the menu: Settings -> Repositories -> Blob Stores and click on the button 'Create blob store'.
Select the type 'File' and set the path to store the images.

### Hosted Repository

To create a hosted repository, go to the menu: Settings -> Repositories -> Repositories and click on the button 'Create repository'.

Select the type 'docker (hosted)' and set the name and the blob store created before. 

* Enable the option 'HTTP' and set the port to 8083.
* Enable the option 'Enable Docker V1 API' and set the port to 8083.

### Proxy Repository

To create a proxy repository, go to the menu: Settings -> Repositories -> Repositories and click on the button 'Create repository'.

Select the type 'docker (proxy)' and set the name and the blob store created before.

Type the URL of the public registry to proxy (e.g. https://registry-1.docker.io) and in Docker Index select 'Use Docker Hub'.

### Group Repository

To create a group repository, go to the menu: Settings -> Repositories -> Repositories and click on the button 'Create repository'.

Select the type 'docker (group)' and set the name and the blob store created before.

* Enable the option 'HTTP' and set the port to 8082.
* Add the hosted and proxy repositories created before.

### Docker

To allow docker to use the private registry, we need to add the configuration in the file: /etc/docker/daemon.json (the file is created if not exists)

```bash
sudo nano /etc/docker/daemon.json
```

and add the insecure-registries:

```bash
{
    "insecure-registries" : ["<host>:8082", "<host>:8083"]
}
```

Now, we can restart the docker service.

```bash
sudo systemctl restart docker
```

#### Docker Usage

To use the private registry, we need to login in the registry.

```bash
docker login -u <user> -p <password> <host>:8082
docker login -u <user> -p <password> <host>:8083
```

After login, we can push the images to the registry.

```bash
docker tag <image>:<tag> <host>:8083/<image>:<tag>
docker push <host>:8083/<image>:<tag> // push to hosted repository directly
```

<b>NOTE: Only for nexus PRO account, we can use the group repository to push the images.</b>

To pull the images from the registry, we need to login in the registry.

```bash
docker pull <host>:8082/<image>:<tag> // by group repository
docker pull <host>:8083/<image>:<tag> // by hosted repository
```

## Dashboard

Enabbling the Kubernetes dashboard by 

```bash
microk8s enable dashboard
```

The current service is a ClusterIP, so we need to change it to NodePort to access it from outside the cluster.

```bash
kubectl edit svc kubernetes-dashboard -n kube-system
```

Change the type from ClusterIP to NodePort and add the nodePort: 30000

* Alternative command to change the type and nodePort
    
```bash 
kubectl patch svc kubernetes-dashboard -n kube-system --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"},{"op":"replace","path":"/spec/ports/0/nodePort","value":30000}]'
```

Now we can access the dashboard from the browser by the url: https://\<host>:30000

To setup the dashboard on current cluster use the token in the file: /home/\<user>/.kube/config