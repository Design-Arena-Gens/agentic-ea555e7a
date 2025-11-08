---
title: Connectivity & Security in CPI
description: Secure inbound/outbound connectivity patterns and configuration.
updated: 2025-11-08
order: 2
---

## Inbound patterns

- HTTP: Expose an iflow endpoint; protect with OAuth2 Client Credentials or Basic
- mTLS: Upload trusted CAs and service certs; enable client cert auth on sender adapter
- IP allowlists: Configure at the subaccount or ingress if applicable

## Outbound patterns

- OAuth2 Client Credentials: Create a destination or credential, use in receiver adapter
- Basic Auth: Store in Security Material, avoid hardcoding in scripts
- mTLS to partners: Upload partner CA to Keystore; use in adapter TLS settings

## Keystore and certificates

- Use separate keys per environment; rotate regularly
- For trial/dev, self-signed is fine for tests; prod requires CA-signed
- Monitor expiring certs; add alerts well before expiry

## Principal propagation

- Configure trust with SAP destinations and cloud connectors
- Ensure S/4HANA or backend trusts CPI identity provider

