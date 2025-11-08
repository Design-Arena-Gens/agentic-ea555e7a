---
title: Groovy Scripting in CPI
description: Patterns and snippets for Groovy scripts in iFlows.
updated: 2025-11-08
order: 3
---

## Script structure

A typical CPI Groovy script receives and returns a `Message` object.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

Message processData(Message message) {
  // read
  def body = message.getBody(java.lang.String)
  def myProp = message.getProperty('MyProperty')

  // write
  message.setProperty('ProcessedAt', new Date().toString())
  message.setHeader('X-Trace', 'cpi')
  message.setBody(body)
  return message
}
```

## Useful snippets

- Read JSON:

```groovy
import groovy.json.JsonSlurper

def json = new JsonSlurper().parseText(message.getBody(java.lang.String))
```

- Set Basic Auth header:

```groovy
def creds = 'user:pass'
def basic = 'Basic ' + creds.bytes.encodeBase64().toString()
message.setHeader('Authorization', basic)
```

- Safely read header with default:

```groovy
def corr = message.getHeader('X-CorrelationID') ?: UUID.randomUUID().toString()
```

## Tips

- Avoid heavy libs; CPI has limited runtime classpath
- Prefer Content Modifier for simple header/property writes
- Keep scripts idempotent and side-effect free
- Log minimally; use trace ids
