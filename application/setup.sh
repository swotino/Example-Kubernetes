#!/bin/bash

sudo apt update
sudo apt install -y python3-pip

# install docker
sudo apt install -y docker.io

# setup docker
sudo usermod -a -G docker vagrant

# install microk8s
sudo snap install microk8s --classic --channel=1.27

# setup microk8s
mkdir -p ~/.kube
microk8s config > ~/.kube/config

sudo usermod -a -G microk8s vagrant
sudo chown -f -R vagrant ~/.kube
echo "alias kubectl='microk8s kubectl'" >> ~/.bash_aliases

# reboot
sudo reboot