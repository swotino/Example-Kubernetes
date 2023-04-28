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