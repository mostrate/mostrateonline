#!/usr/bin/env bash
# Verifica un deploy de la landing. Lo usa el workflow Deploy; también corre a mano
# contra `next start` local.
#
#   deploy/verify.sh <url-base> <produccion|staging>
#
# Staging necesita STAGING_PASSWORD (y STAGING_USER si se usa) en el entorno.
set -euo pipefail

base="${1%/}"
destino="$2"
routes=(/ /biblioteca-templates /templates/profesional /templates/comercio /templates/gastronomia /templates/bienestar)
fail=0

auth=()
if [ "$destino" = "staging" ]; then
  : "${STAGING_PASSWORD:?Falta STAGING_PASSWORD}"
  auth=(-u "${STAGING_USER:-mostrate}:${STAGING_PASSWORD}")
fi

code() { curl -s -o /dev/null -w "%{http_code}" "$@" || true; }

expect() { # expect <código esperado> <descripción> <args de curl...>
  local want="$1" what="$2"; shift 2
  local got; got=$(code "$@")
  if [ "$got" = "$want" ]; then echo "ok   $got  $what"; else echo "FAIL $got  $what (esperaba $want)"; fail=1; fi
}

# El deploy puede tardar unos segundos en responder.
for _ in $(seq 1 12); do
  c=$(code "${auth[@]}" "$base/")
  [ "$c" = "200" ] && break
  sleep 5
done

for r in "${routes[@]}"; do expect 200 "$r" "${auth[@]}" "$base$r"; done
expect 404 "/no-existe" "${auth[@]}" "$base/no-existe"

# Una imagen de next/image de la biblioteca (la portada las carga en el cliente): tiene
# que llegar como imagen. En producción pasa por /_next/image; en staging va directo.
img=$(curl -s "${auth[@]}" "$base/biblioteca-templates" | grep -oE '<img[^>]* src="/[^"]+"' | head -1 | sed -E 's/.* src="([^"]+)"/\1/; s/&amp;/\&/g' || true)
if [ -z "$img" ]; then
  echo "FAIL no encontré ninguna <img> en /biblioteca-templates"; fail=1
else
  img_url="$base$img"
  type=$(curl -s -o /dev/null -w "%{http_code} %{content_type}" "${auth[@]}" "$img_url" || true)
  case "$type" in
    "200 image/"*) echo "ok   $type  $img" ;;
    *) echo "FAIL $type  $img (esperaba 200 image/*)"; fail=1 ;;
  esac
fi

if [ "$destino" = "staging" ]; then
  expect 401 "/ sin contraseña" "$base/"
  expect 401 "/templates/comercio sin contraseña" "$base/templates/comercio"
  expect 401 "/ con contraseña incorrecta" -u "x:no-es-la-contraseña" "$base/"
  [ -n "${img:-}" ] && expect 401 "imagen sin contraseña" "$img_url"
  if curl -sI "${auth[@]}" "$base/" | grep -qi '^x-robots-tag: noindex'; then
    echo "ok   noindex"
  else
    echo "FAIL falta X-Robots-Tag: noindex"; fail=1
  fi
fi

exit "$fail"
