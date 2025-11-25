Get-ChildItem -Path ".\asilParla-1.17.02" -Recurse | ForEach-Object {
  [PSCustomObject]@{
    Path = $_.FullName
    IsDirectory = $_.PSIsContainer
    Size = if ($_.PSIsContainer) { 0 } else { $_.Length }
    LastWriteTime = $_.LastWriteTime
    Hash = if ($_.PSIsContainer) { "" } else { (Get-FileHash $_.FullName -Algorithm SHA256).Hash }
  }
} | ConvertTo-Json -Depth 3
