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
docker build -t backend:1.0 .
docker save -o backend.tar backend:1.0
microk8s ctr image import backend:1.0
```

Now, we can able to apply the YAML file to kubernetes.

```bash
kubectl apply -f kube-backend.yaml
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