param(
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$siteRoot = 'https://layero.ro'
$indexNowKey = 'd3f61d8c875a4f48a564be1424c44f16'
$keyLocation = "$siteRoot/$indexNowKey.txt"
$sitemapPath = Join-Path $PSScriptRoot 'sitemap-pages.xml'

if (-not (Test-Path -LiteralPath $sitemapPath)) {
    throw "Missing sitemap: $sitemapPath"
}

[xml]$sitemap = Get-Content -LiteralPath $sitemapPath -Raw
$namespace = New-Object System.Xml.XmlNamespaceManager($sitemap.NameTable)
$namespace.AddNamespace('s', 'http://www.sitemaps.org/schemas/sitemap/0.9')
$urls = @($sitemap.SelectNodes('//s:url/s:loc', $namespace) | ForEach-Object { $_.InnerText })

if ($urls.Count -eq 0) {
    throw 'The page sitemap contains no URLs.'
}

$payload = @{
    host = 'layero.ro'
    key = $indexNowKey
    keyLocation = $keyLocation
    urlList = $urls
} | ConvertTo-Json -Depth 3

if ($DryRun) {
    Write-Output "IndexNow dry run: $($urls.Count) URLs"
    Write-Output $payload
    exit 0
}

Invoke-RestMethod `
    -Uri 'https://api.indexnow.org/indexnow' `
    -Method Post `
    -ContentType 'application/json; charset=utf-8' `
    -Body $payload

Write-Output "IndexNow submission completed: $($urls.Count) URLs"
