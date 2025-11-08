---
title: SAP Cloud Integration (CPI) Overview
description: The essentials you need to be productive in CPI.
updated: 2025-11-08
order: 1
---

## What is CPI?

SAP Cloud Integration (formerly CPI) is an iPaaS on SAP Business Technology Platform focused on enterprise integrations with prebuilt content, adapters, and a visual iFlow designer.

- Runtime: Cloud Foundry worker nodes per tenant
- Model: Integration Flow (iFlow) with steps, adapters, and artifacts
- Artifacts: iFlows, Value Mappings, Script Collections, Keystores, Certificates

## Core building blocks

- Adapters: HTTP, IDoc, OData, SFTP, JMS, JDBC, SuccessFactors, Ariba, more
- Flow steps: Content Modifier, Groovy/JS, Router, Gather, Multicast, Exception Subprocess
- Security: OAuth2 (client credentials), Basic Auth, mTLS, X.509, Principal Propagation

## Tenants and access

- Tenants: Trial, Dev, Test, Prod; isolated runtime and design workspaces
- Roles: BusinessExpert (design), BusinessIntegrator (runtime), Operations roles
- Access: Assigned via BTP subaccount role collections

## When to use CPI vs. alternatives

Use CPI when integrating SAP backbones (S/4HANA, SuccessFactors, Ariba), leveraging SAP adapters and prepackaged content. Consider general iPaaS or event buses when deeply non-SAP and requiring advanced streaming or low-latency eventing beyond CPI's scope.

