module.exports = {
  apps : [
  {
    name   : "api",
    script : "npm",
    args:"start"
  },
  {
    name   : "crawler",
    script : "npm",
    args:"run crawler",
    exp_backoff_restart_delay: 100


  },
  {
    name   : "addQueue",
    script : "npm",
    args:"run add",
    cron_restart: "*/30 * * * * *"

  }
]
}
