
[![Kong](https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-combination-mark-colors-128px.png "Kong")]()

- [Kong](https://konghq.com/) is a cloud-native, platform-agnostic, scalable API Gateway distinguished for its high performance and extensibility via plugins. Build on top NGINX and Openresty.

---

## Folder Structure
1. ``docker/`` folder contains ``docker-compose.yml`` file to provision ``kong`` and ``kong-database``

2. ``insomnia-collection/`` folder contains a list of Kong REST API Endpoints to run this example

---
## Getting Started

1. Run ``docker-compose up`` using ``docker/docker-compose.yaml`` file based on your OS architecture. This will provision a Kong PostgreSQL database only (Notice the commented Kong service section)
    ```shell
        $ docker-compose -f docker/arm64/docker-compose.yaml up -d
        # or
        $ docker-compose -f docker/x86/docker-compose.yaml up -d
    ```
2. Run the migration ``migration.sh`` which will bootstrap Kong
    ```shell
        $ chmod +x docker/arm64/migration.sh && /bin/bash docker/arm64/migration.sh
        # or
        $ chmod +x docker/x86/migration.sh && /bin/bash docker/x86/migration.sh
    ```
3. Uncomment Kong service section and re-run step 1
4. Navigate to Kong Admin API ``http://localhost:8001`` to check if Kong up and running
5. Kong is ready to be used 🎉