Vagrant.configure("2") do |config|

    config.vm.define "master" do |master|
        master.vm.box = "bento/ubuntu-20.04-arm64"
        master.vm.box_version = "202301.20.0"
        master.vm.hostname = "master"
        master.vm.network "private_network", ip: "10.10.0.100"
        master.vm.provision "shell", path: "application/setup.sh"
        master.vm.provider "parallels" do |vb|
            vb.memory = "2048"
            vb.cpus = "2"
        end
    end

    config.vm.define "node" do |node|
        node.vm.box = "bento/ubuntu-20.04-arm64"
        node.vm.box_version = "202301.20.0"
        node.vm.hostname = "node"
        node.vm.network "private_network", ip: "10.10.0.101"
        node.vm.provision "shell", path: "application/setup.sh"
        node.vm.provider "parallels" do |vb|
            vb.memory = "2048"
            vb.cpus = "2"
        end
    end

    config.vm.define "registry" do |registry|
        registry.vm.box = "bento/ubuntu-20.04-arm64"
        registry.vm.box_version = "202301.20.0"
        registry.vm.hostname = "registry"
        registry.vm.network "private_network", ip: "10.10.0.200"
        registry.vm.provision "shell", path: "registry/setup.sh"
        registry.vm.provider "parallels" do |vb|
            vb.memory = "2048"
            vb.cpus = "2"
        end
    end
end